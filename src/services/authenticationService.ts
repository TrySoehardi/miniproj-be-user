import { AuthenticationDTO } from "../DTO/authenticationDto";
import { AppDataSource } from "../typeorm.config";
import { User } from "../entity/user";
import { IDI } from "../interface/Idi";
import crypto from "crypto";
import { BadRequestError } from "../error/badRequestError";
import jwt from "jsonwebtoken";

export class AuthenticationService {
    private userRepo;
    private di;
    private secretKey = process.env.SECRET_KEY || "default_secret_key";

    constructor(di: IDI) {
        this.di = di;
        this.userRepo = AppDataSource.getRepository(User);
    }

    private hashPassword(password: string): string {
        return crypto.createHmac("sha256", this.secretKey).update(password).digest("hex");
    }

    public async signUp(user: AuthenticationDTO) {
        const hashedPassword = this.hashPassword(user.password);
        const newUser = this.userRepo.create({ ...user, password: hashedPassword });
        return await this.userRepo.save(newUser);
    }

    public async signIn(user: AuthenticationDTO) {
        const foundUser = await this.userRepo.findOneBy({ email: user.email });
        if (!foundUser) {
            throw new BadRequestError("Invalid username or password");
        }
        const hashedPassword = this.hashPassword(user.password);
        if (hashedPassword !== foundUser.password) {
            throw new BadRequestError("Invalid username or password");
        }
        const token = jwt.sign(
            { userId: foundUser.id, email: foundUser.email },
            this.secretKey,
            { expiresIn: "1h" }
        );
        return { token };
    }
}
