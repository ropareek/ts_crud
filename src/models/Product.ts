import { Document, Types, Schema, Model, model } from 'mongoose'
import { EnumType } from 'typescript';

export interface Product {
    name: string,
    description:string,
    slug:string,
    status:EnumType,
    ownerId:string,
}

export const ProductSchema = new Schema({
    
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    slug: {
       type: String,
       unique: true,
    },
    status: {
       type: String,
       enum: ["active", "inactive"],
    },
    ownerId: {
      type: String,
    },
    createdAt: {
      type: Date,
      // required: true,
    }, 
    updatedAt: {
      type: Date,
      // required: true,
    },
})

export const Product:Model<Product> = model<Product>("Product",ProductSchema)