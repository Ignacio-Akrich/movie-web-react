import React, {useState, useEffect} from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";

import './ModalVideo.scss';

export default function ModalVideo(props) {
    const { videoKey, videoPlataform, isOpen, close} = props;
    const [urlVideo, setUrlVideo] = useState(null);

    useEffect(() => {
        switch (videoPlataform) {
            case "YouTube":
                setUrlVideo(`https://www.youtu.be/${videoKey}`);
                break;
            case "Vimeo":
                setUrlVideo(`https://vimeo.com/${videoKey}`);
                break;
            default:
                break;
        }
    }, [videoKey, videoPlataform]);

    return (
        <Modal
            className="modal-video"
            visible={isOpen}
            centered
            onCancel={close}
            footer={false}
        >
            <ReactPlayer url={urlVideo} controls />
        </Modal>
    )
}
