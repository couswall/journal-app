
const cloudName = import.meta.env.VITE_CLOUDINARY_NAME; 
const cloudFolder = import.meta.env.VITE_CLOUDINARY_FOLDER; 

export const fileUpload = async ( file: File ) => {
    
    if( !file ) throw new Error("No hay ningún archivo para subir");

    const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    
    const formData = new FormData(); 
    formData.append("upload_preset", cloudFolder); 
    formData.append("file", file); 
    
    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        }); 

        const cloudResp = await resp.json(); 
        // console.log( cloudResp ); 

        return cloudResp.secure_url; 
        
    } catch (error) {
        // console.log( error );
        if ( error instanceof Error) throw new Error( error.message ); 
        
    }
}
