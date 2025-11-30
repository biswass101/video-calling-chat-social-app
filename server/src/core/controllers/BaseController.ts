import { CatchAsync } from "../../shared/helpers/catchAsync";

export class BaseController {
    protected catchAsync: CatchAsync;
    
    constructor() {
        this.catchAsync = new CatchAsync();
    }

    public wrap(method: Function) {
        return this.catchAsync.catch(method.bind(this));
    }
}