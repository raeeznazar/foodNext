'use client'
import { useState } from 'react';
import { useRef } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';
export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();

    const filePickerRef = useRef();

    function pickImageHandler() {
        filePickerRef.current.click();
    }

    function pickedHandler(event) {
        const pickedFile = event.target.files[0];
        if (!pickedFile) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(pickedFile);
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

    }

    return (
        <div className={classes.picker}>
            {/* <label htmlFor={name}>{label}</label> */}

            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>Please pick an image.</p>}
                    {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill />}
                </div>
                <input className={classes.input} type="file" id={name} name={name} accept="image/png, image/jpeg" ref={filePickerRef} onChange={pickedHandler} />
                <button type="button" className={classes.button} onClick={pickImageHandler}>
                    Pick Image
                </button>
            </div>
        </div>
    );
}