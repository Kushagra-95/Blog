import config from "../config/config";
import { Client, Databases ,ID ,Storage,Query } from "appwrite";
export class DatabaseService{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteurl) 
        .setProject(config.appwriteprjid); 
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
               config.appwritedatabase, 
               config.appwritecollectionid, 
               slug, 
               {
                title,
                content,
                featuredImage,
                status,
                userid:userId
               }, 
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
}
async updatePost(slug,{title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(
           config.appwritedatabase, 
           config.appwritecollectionid, 
           slug, 
           {
            title,
            content,
            featuredImage,
            status,
           }, 
        );
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error",error);
    }
}
async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            config.appwritedatabase,
            config.appwritecollectionid,
            slug
        );
        return true;
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error",error);
        return false;
    }
}
async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwritedatabase, 
            config.appwritecollectionid, 
            slug, 
        );
        return true;
    } catch (error) {
        console.log("Appwrite service :: getPost :: error",error);
        return false
    }
}
async listPost(queries=[
    Query.equal('status', ["active"])
]){
    try {
        return await this.databases.listDocuments(
            config.appwritedatabase, 
            config.appwritecollectionid, 
            queries
        );
    } catch (error) {
        console.log("Appwrite service :: listPost :: error",error);
        return false
    }
}
//file upload services
async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwritebucketid,
            ID.unique(),
            file
        );
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error",error);
    
    }
}
async deleteFile(fileId){
    try {
         await this.bucket.deleteFile(
            config.appwritebucketid, // bucketId
            fileId // fileId
        );
        return true;
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error",error);
        return false
    }
}
    previewFile(fileId){
        return this.bucket.getFilePreview(
            config.appwritebucketid,
            fileId, 
        )
}
}
const databaseservice=new DatabaseService();
export default databaseservice;


