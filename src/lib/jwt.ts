import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption{
    expiresIn?:string | number

}

const Default_Sign_Option:SignOption={
    expiresIn:'1h' // 1 hour default expiration time.
}
export function signJwtAccessToken(payload:JwtPayload,options:SignOption=Default_Sign_Option){
const secretKey=process.env.JWT_SECRET_KEY
const token=jwt.sign(payload,secretKey!,options)
return token
    
}

export function verifyJwt(token:string){
    try{
        const secretKey=process.env.JWT_SECRET_KEY
        const decoded=jwt.verify(token,secretKey!)
        return decoded as JwtPayload
    }catch(err){
        console.log(err)
        console.log('Invalid Token')
        return null
    }

}