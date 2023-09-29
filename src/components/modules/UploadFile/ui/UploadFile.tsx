/* eslint-disable no-undef */
import './UploadFile.scss';
import ReactS3Client from 'react-aws-s3-typescript';
import { IConfig } from 'react-aws-s3-typescript/dist/types';
import { ChangeEvent, useEffect, useState } from 'react';

const bucketName = process.env.REACT_APP_BUCKET_NAME!
const region = process.env.REACT_APP_REGION!
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID!
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY!

const config: IConfig = {
    bucketName,
    region,
    accessKeyId,
    secretAccessKey,
}
    
export const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const s3 = new ReactS3Client(config);

    const handleFileInput = (e:any) => {
        setSelectedFile(e.target.files[0]);
    }

    const filename = 'filename'

    const handleUpload = async (file: File) => {
        s3.uploadFile(file, filename)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.error(err))
    }
    const listFiles = async () => {
        s3.listFiles().then(({data}) => console.log(data.Contents)).catch(err => console.error(err))
    }

    useEffect(() => {
        listFiles()
    }, [])

    return (<div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>)
}
