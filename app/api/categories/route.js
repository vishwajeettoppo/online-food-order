import { Category } from "@/models/Category";

export async function POST(req){
    const {name}=await req.json();
    const newCat=await Category.create({name})
    return Response.json(newCat)
}

export async function PUT(req){
    const {_id, name}=await req.json();
    await Category.updateOne({_id}, {name})
    return Response.json(true)
}

export async function GET(){
    return Response.json(await Category.find())
}