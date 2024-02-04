import { Request, Response } from 'express';

export interface MyRequest extends Request {
    user?: any
}

export interface MyResponse extends Response {

}

