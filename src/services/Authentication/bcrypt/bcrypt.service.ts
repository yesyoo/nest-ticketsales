import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

    async encode(password: string): Promise<any> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async compare(password: string, hash: string): Promise<any> {
        return await bcrypt.compare(password, hash);
    }
    
}
