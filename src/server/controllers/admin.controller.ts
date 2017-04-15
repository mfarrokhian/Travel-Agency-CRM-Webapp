import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import * as HashIds from "hashids";
import { AdminModel, SiteModel } from "../models";
import ServerConfig from "../serverConfig";
import {
    readFileAsync,
    encryptPwdAsync,
    generateRandStrAsync,
    comparePwdsAsync,
    tokenStorage,
    writeFileAsync,
    issueTokenJWTAsync,
    verifyTokenJWTAsync,
    decodeTokenJWTSync,
    basicCookieSessOptions,
    basicCookieJwtOptions } from "../services";
import { AuthenticationError, RegistrationError, ApplicationError } from "../errors";
import {
    IRegistrationAdminInfo,
    IDocOnAdminSingin,
    IDocOnAdminRegister } from "../interfaces";


class AdminController {
    private inMemoryStorage = new Map<string, number>();
    private isMessage = process.env.NODE_ENV === "development";

/** This helpers ony for debag */
   async recordToDB() {
        let adminCredentialsString = await readFileAsync("credentialsForAdminRegistration.json");
        let { login, password } = JSON.parse(adminCredentialsString.toString());
        let salt = "6267697b9df59c89f317d37f372eeddd71de9460788cd1277f13e379c83c92bd6bf4f80637552487d73303450ef44d50"; // await generateRandStrAsync();
        let hash = await encryptPwdAsync(password, salt.toString());

        return new SiteModel({
            _id: ServerConfig.SITE_ID,
            login,
            password: hash,
            passwordSalt: salt.toString()
        }).save((err, product, numAffected) => {
            if (err) console.log(err);
            console.log("Admin Credentils is ", product);
            console.log("Status code ", numAffected);
        });

    }
/**end debag helpers */

    private cancelTimer(uuidToken: string): boolean {
        if (uuidToken && this.inMemoryStorage.has(uuidToken)) {
            console.log("checkForNewComerAsync : uuidToken && this.inMemoryStorage.has(uuidToken)");
            let timerId = this.inMemoryStorage.get(uuidToken);
            timerId && clearTimeout(timerId);
            this.inMemoryStorage.delete(uuidToken);
            return true;
        }
        return false;
    }
    adminSignOutSync(...args: Array<any>) {
        const res: Response = args[1];
        let config = { path: "/" };
        res.clearCookie(ServerConfig.SESSION_TOKEN_NAME, config)
            .clearCookie(ServerConfig.COOKIE_JWT_NAME, config)
            .end();
    }
    adminSingInAsync(req: Request, res: Response) {
        // const { userName } = req.body;
        // debag
        // const ReqBody = { userName: "admin123", pass: "Mirissa007" };
        // const ReqBody = { userName: "Dmitry", pass: "12345" };
        const { userName, pass } = req.body;
        const uuidToken = req && req.signedCookies[ServerConfig.ASSUMED_ADMIN_COOKIE_KEY];
        this.cancelTimer(uuidToken);


        let ADMIN_DOC: mongoose.Document;
        let SESSION_TOKEN: string;
        let JWT: string;
        let _id: string;
        let hash;
        let role: "E" | "O";
        let passwordSalt;
        let name: string;
        return this.checkUnMatchWithSiteLoginAsync(userName)
                        .then(() => AdminModel.findOne({ name: userName })
                                               .select("password passwordSalt name role")
                         )
                        .then((admin: mongoose.Document & IDocOnAdminSingin) => {
                            if (!admin) throw new AuthenticationError("No such user");
                           ({ password: hash, passwordSalt, _id, name, role } = ADMIN_DOC = admin);
                           return comparePwdsAsync()(hash, passwordSalt, pass);
                        })
                        .then(ComparedResult => {
                            if (ComparedResult) {
                                SESSION_TOKEN = new HashIds(ServerConfig.HASHIDS_SALT).encodeHex(_id);
                                return issueTokenJWTAsync({ subject: SESSION_TOKEN });
                            }
                            throw new AuthenticationError("Wrong password");
                        })
                        .then(jwt => {
                            JWT = <string>jwt;
                            return ADMIN_DOC.update({ jwt });
                        })
                        .then(() => {
                            if (!res.headersSent) {
                                const adminData = role === "E" ? {name, id: SESSION_TOKEN, role} : {name, id: SESSION_TOKEN};
                                const sessOpts: any = req.secure ? {
                                    signed: true,
                                    httpOnly: true,
                                    sameSite: true,
                                    secure: true
                                } : basicCookieSessOptions;
                                const jwtOpts: any = req.secure ? {
                                    signed: true,
                                    httpOnly: true,
                                    sameSite: true,
                                    secure: true,
                                    maxAge: ServerConfig.JWT_MAX_AGE
                                } : basicCookieJwtOptions;
                                res.clearCookie(ServerConfig.ASSUMED_ADMIN_COOKIE_KEY, {path: "/"})
                                    .cookie(
                                        ServerConfig.SESSION_TOKEN_NAME,
                                        SESSION_TOKEN,
                                        sessOpts
                                    )
                                    .cookie(
                                        ServerConfig.COOKIE_JWT_NAME,
                                        JWT,
                                            // 1.5
                                        jwtOpts
                                    )
                                    .json(adminData);
                            }
                        });
    }
    private checkForNewComerAsync(req: Request, res: Response): Promise<boolean> {
        // const[req, res] = args;
        // debag
        // const ReqBody = { userName: "admin123", pass: "Mirissa007" };
       // const ReqBody = { userName: "Dmitry", pass: "12345" };
        const { userName, pass } = req.body; // ReqBody;
        const uuidToken = req && req.signedCookies[ServerConfig.ASSUMED_ADMIN_COOKIE_KEY];
        let thenHandler = (result: boolean, isEditorHave: boolean) => {
                if (!res.headersSent && result) {
                    const CookieOpts: any = req.secure ? {
                                    signed: true,
                                    httpOnly: true,
                                    sameSite: true,
                                    secure: true,
                                    maxAge: ServerConfig.TTL + 1000
                    } : {
                        signed: true,
                        httpOnly: true,
                        sameSite: true,
                        maxAge: ServerConfig.TTL + 1000
                    };

                    res.cookie(
                        ServerConfig.ASSUMED_ADMIN_COOKIE_KEY,
                        tokenStorage(this.inMemoryStorage, { ttl: ServerConfig.TTL })(),
                        CookieOpts);
                    if (!isEditorHave) {
                        res.json({r: true, canEdit: true});
                    }else {
                        res.json({r: true});
                    }
                    return 0;
                }
            return 1;
        };
        this.cancelTimer(uuidToken);
        return SiteModel.findById(ServerConfig.SITE_ID)
                    .select("login password passwordSalt isEditorHave")
                    .then((resultSet: mongoose.Document & { login: string, password: string, passwordSalt: string, isEditorHave: boolean }) => {
                        const{ password : hash, passwordSalt, isEditorHave, login } = resultSet;
                        if (login !== userName) return false;
                        return comparePwdsAsync()(hash, passwordSalt, pass)
                                .then(result => thenHandler(result, isEditorHave));
                    });
    }
    signInController() {
        return async (req: Request, res: Response) => {
            try {
                for (let promise of [this.adminSingInAsync(req, res), this.checkForNewComerAsync(req, res)]) {
                    await promise.catch(err => console.log(err.message));
                }
                if (!res.headersSent) {
                    res.status(401).end();
                }
            }catch (e) {
                if (!res.headersSent) {
                    res.status(500).end(this.isMessage ? e.message : null);
                }else {
                    console.log("Error from signInController ", e.message);
                }
            }
        };
    }
    private SaveRootAdminBackupCredentialsAsync(ReqBody: IRegistrationAdminInfo): Promise<number[] | number> {
        const UpdateEditorGlobally = () => SiteModel.findByIdAndUpdate( ServerConfig.SITE_ID, { isEditorHave: true }).then(() => 0);

        let RootAdmin = Object.assign({}, ReqBody);
        if ( RootAdmin && RootAdmin.role === "E" ) {
            return Promise.all<number>([
                writeFileAsync(ServerConfig.BACK_UP_FILE_NAME, JSON.stringify(RootAdmin)),
                UpdateEditorGlobally()
            ]);
        }
        return Promise.resolve(0);
    }
    private checkUniqueNameAsync(userName: string) {
        return AdminModel.count({ name: userName })
                            .then(count => {
                                if (count !== 0) throw new RegistrationError("Name must to be unique");
                                return 0;
                            });
    }
    private checkUnMatchWithSiteLoginAsync(userName: string) {
        return readFileAsync(ServerConfig.BACK_UP_CREDENTIALS_FOR_ADMIN_REGISTRATION)
                        .then((result: any) => {
                            if (JSON.parse(result).login === userName) {
                                throw new RegistrationError("User name must to be unique!");
                            }
                            return 0;
                        });
    }
    verifyUniqAsync(userName: string, res?: Response) {
        return Promise.all([
                    this.checkUnMatchWithSiteLoginAsync(userName),
                    this.checkUniqueNameAsync(userName)
                ])
                .then(result => {
                    if (res) {
                        return res.send(JSON.stringify(result));
                    }
                    return result;
                })
                .catch(err => {
                    if (res) {
                        if (err instanceof RegistrationError) {
                            return res.status(403).end(this.isMessage ? err.message : null);
                        }
                        return res.status(500).end(this.isMessage ? err.message : null);
                    }
                    throw err;
                });
    }
    registerNewAdminController(isSendForbiden= true) {
        // debag
        // const ReqBody: IRegistrationAdminInfo = {
        //     userName: "Dmitry",
        //     pass: "12345",
        //     role: "E"
        // };

        return (req: Request, res: Response) => {
            const ReqBody = req.body;
            const{ userName, pass, role } = ReqBody;
            const uuidToken = req && req.signedCookies[ServerConfig.ASSUMED_ADMIN_COOKIE_KEY];
            if (!uuidToken || !(userName && pass && role)) {
                return res
                        .clearCookie(ServerConfig.ASSUMED_ADMIN_COOKIE_KEY)
                        .status(403)
                        .json({expired: true});
            }
            let _id: mongoose.Types.ObjectId;
            let HASHED_ID: string;
            let jwt: string;
            let passwordSalt: string;
            let passwordHash: string;
            let adminData: any;
            return this.verifyUniqAsync(userName)
                .then(() => {
                    this.cancelTimer(uuidToken);
                    _id = new mongoose.Types.ObjectId;
                    HASHED_ID = new HashIds(ServerConfig.HASHIDS_SALT).encodeHex(_id.toString());
                    adminData = role === "E" ? {name: userName, id: HASHED_ID, role} : {name: userName, id: HASHED_ID};
                    return Promise.all([
                        this.SaveRootAdminBackupCredentialsAsync(ReqBody),
                        generateRandStrAsync().then(salt => {
                            passwordSalt = salt.toString();
                            return encryptPwdAsync(pass, passwordSalt);
                        }),
                        issueTokenJWTAsync({ subject: HASHED_ID })
                    ]);
                })
                .then((resultArray: [number, string, string]) => {
                    [, passwordHash, jwt ] = resultArray;
                    return new AdminModel({
                        _id,
                        name: userName,
                        password: passwordHash,
                        passwordSalt,
                        role,
                        siteRef: ServerConfig.SITE_ID
                    }).save();
                })
                .then((/*adminDoc: mongoose.Document & IDocOnAdminRegister*/) => {
                    const sessOpts: any = req.secure ? {
                                    signed: true,
                                    httpOnly: true,
                                    sameSite: true,
                                    secure: true
                    } : basicCookieSessOptions;
                    const jwtOpts: any = req.secure ? {
                                    signed: true,
                                    httpOnly: true,
                                    sameSite: true,
                                    secure: true,
                                    maxAge: ServerConfig.JWT_MAX_AGE
                    } : basicCookieJwtOptions;
                            res.clearCookie(ServerConfig.ASSUMED_ADMIN_COOKIE_KEY)
                                .cookie(
                                    ServerConfig.SESSION_TOKEN_NAME,
                                    HASHED_ID,
                                    sessOpts
                                )
                                .cookie(
                                    ServerConfig.COOKIE_JWT_NAME,
                                    jwt,
                                    // 1.5
                                    jwtOpts
                                )
                                .json(adminData);
                })
                .catch(err => {
                    if (err instanceof RegistrationError) {
                        return isSendForbiden ? res.status(403).end(this.isMessage ? err.message : null) : res.status(403).json({exists: true});
                    }
                    return res.status(500).end(this.isMessage ? err.message : null);
                });
        };

    }
    tokenValidatorController(isMiddleware= false) {
        return (req: Request, res: Response, next: NextFunction) => {
            const{ _xt, _st } = req.signedCookies;
            let expireTimeHelper = (err: any, sessToken: string) => {
                if (err.name === "TokenExpiredError") {
                    return updateJwt(sessToken);
                }
                throw err;
            };
            let updateJwt = (sessToken: string) => {
                return issueTokenJWTAsync({ subject: sessToken })
                            .then(jwt => {
                                const sessOpts: any = req.secure ? {
                                    signed: true,
                                    httpOnly: true,
                                    sameSite: true,
                                    secure: true
                                } : basicCookieSessOptions;
                                const jwtOpts: any = req.secure ? {
                                    signed: true,
                                    httpOnly: true,
                                    sameSite: true,
                                    secure: true,
                                    maxAge: ServerConfig.JWT_MAX_AGE
                                } : basicCookieJwtOptions;
                                !isMiddleware ? res.cookie(ServerConfig.COOKIE_JWT_NAME, jwt, /*1.5*/ jwtOpts)
                                        .cookie(ServerConfig.SESSION_TOKEN_NAME, sessToken, sessOpts)
                                        .end(/*jwt*/) : next();
                                    // debag only for now , need to change data flow!!!
                                    // .json({id: sessToken});
                            });
            };
            let PromiseResult = null;
            switch (true) {
                    case ( _xt !== undefined && _st !== undefined ): {
                        PromiseResult = verifyTokenJWTAsync(_xt, { subject: _st })
                                                .then(/*rawResult*/() => !isMiddleware ? res.end() : next()/*.json(rawResult{id: rawResult.sub})*/)
                                                .catch(err => expireTimeHelper(err, _st));
                        break;
                    }
                    case ( _xt === undefined && _st !== undefined ): {
                        PromiseResult = updateJwt(_st);
                        break;
                    }
                    case ( _xt !== undefined && _st === undefined ): {
                        const sessToken = decodeTokenJWTSync(_xt).payload.sub;
                        PromiseResult = verifyTokenJWTAsync(_xt, { subject: sessToken })
                                                .then(/*rawResult*/() => {
                                                    const sessOpts: any = req.secure ? {
                                                        signed: true,
                                                        httpOnly: true,
                                                        sameSite: true,
                                                        secure: true
                                                    } : basicCookieSessOptions;

                                                    !isMiddleware ? res.cookie(ServerConfig.SESSION_TOKEN_NAME, sessToken, sessOpts)
                                                            .end() : next();
                                                        // .json(/*rawResult*/{id: rawResult.sub});
                                                })
                                                .catch(err => expireTimeHelper(err, sessToken));
                        break;
                    }
                    default: {
                        return res.status(401).end();
                    }
            }
            PromiseResult && PromiseResult.catch(err => res.status(401).end(this.isMessage ? err.message : null));
        };
    }
    getAdminInfoController() {
        return (req: Request, res: Response) => {
            const{ _st } = req.signedCookies;
            if (!_st) {
                return res.status(403).end();
            }
            const decodedSt = new HashIds(ServerConfig.HASHIDS_SALT).decodeHex(_st);
            return AdminModel.findById(decodedSt)
                            .select("name role")
                            .then((admin: IDocOnAdminRegister & mongoose.Document) => {
                                if (admin && admin.name) {
                                    return res.json({ name: admin.name, id: _st, role: admin.role });
                                }
                                throw new ApplicationError("Admin with this id doesn't exists!");
                            })
                            .catch(() => res.status(403).end());
        };
    }
}
const adminController = new AdminController();
export {adminController};