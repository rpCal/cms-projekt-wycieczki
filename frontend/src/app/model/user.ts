export class User {
    public _id: number;
    public Email: string;
    public Password: string = "";
    public FirstName: string;
    public LastName: string;
    public IsAdmin: boolean;

    constructor(user:any){
        this._id = user._id
        this.Email = user.Email
        this.FirstName = user.FirstName
        this.Password = user.Password
        this.LastName = user.LastName
        this.IsAdmin = user.IsAdmin
    }
}
