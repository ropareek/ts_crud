import { Document, Types, Schema, Model, model } from "mongoose";
import { EnumType } from "typescript";

export interface Customer 
{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    products: Array<String>,
    status: EnumType,
    token:string, 
}

export const CustomerSchema = new Schema (
    {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    products: {
        type: Array<String>()
    },
    status: {
        enum: ['active', 'inactive', 'banned']
    },
    token:{
        type:String
    }
    }
)

export const Customer:Model<Customer> = model<Customer>("Customer", CustomerSchema)