import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Webcam from "react-webcam";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { humanPointsPersonal, stopPersonal, inicializePersonal } from '../actions/videoActions'
// o inicialize tem que ser na página anterior 
import * as mpPose from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import api from '../services/api';


function RecordPersonalScreen({ location, history }) {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    var info = []; 
    const [id, setId] = useState(0);
    let idIn = 1;
    let active = false;
    const drawingUtils = window;
    var finaliza = false;
    let resultsOld = 0 
    let landMarks = []
    let cont = 0 ; 
    let contImage = 60;
    let referenceTime = 0
    let activeEffect = 'mask';
    let idExercicio = 1;
    const [mensagens, setMensagens] = useState([]);
    const [results, setResults] = useState([]);
    const [stop, setStop] = useState(false);
    let camera;

    const dispatch = useDispatch()

    // const exerciseInicialize = useSelector(state => state.exerciseInicialize)
    // const { exercise } = exerciseInicialize

    const exercise = useSelector(state => state.exercise)
    const { exerciseData, exerciseIndications } = exercise

    const videoStopPersonal = useSelector(state => state.videoStopPersonal)
    const { successVideo0 } = videoStopPersonal

    if (!exerciseIndications.series) {
        history.push('/indications')
    }

    async function sendHumanPoints(results){

        if(!finaliza) {
            console.log("finaliza", finaliza)
            await api.post(`/pointsHuman/${idIn}`, {results})
            .then(res => {
              if (Number(res.data[1]) != -1) {
                info = res.data; 
                setMensagens(res.data);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        return false;
    }

    function onResults(results) {
        const canvasElement = canvasRef.current
        const canvasCtx = canvasElement.getContext('2d');
        
        let corPadrao = "#FFF"
        let corArticulacao = "#FFF"
        let corArtAux = "#FFF"
        let corPostura = "#FFF"
        let corTempo = "#20295F"
        
        if (results.poseLandmarks != undefined) {
          if (results.poseLandmarks[0] != resultsOld && !finaliza) {
            sendHumanPoints(results.poseLandmarks);
            //dispatch(humanPointsPersonal(1, results.poseLandmarks))
          }   
          resultsOld = results.poseLandmarks[0]
          contImage = 0; 
        }
    
        if (results.poseLandmarks) {
    
            canvasCtx.save();
        
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
        
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            
            canvasCtx.drawImage(
                results.image,
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );
        
            
            if (info.length != 0) { 
                corArticulacao = info.count == 0 ? "#FF0000" : "#00FF00"
                // corArtAux = info[5][1] == 0 ? "#FF0000" : "#00FF00"
                // corPostura = info[5][2] == 0 ? "#FF0000" : "#00FF00"
                corTempo = info.timeUp == 0 ? "#FF0000" : "#00FF00"
            } 
        
            drawingUtils.drawLandmarks(
                canvasCtx,
                Object.values(mpPose.POSE_LANDMARKS)
                    .slice(11, 13).map(index => results.poseLandmarks[index]),
                {visibilityMin: 0.65, color: corArtAux,});
        
            drawingUtils.drawLandmarks(
                canvasCtx,
                Object.values(mpPose.POSE_LANDMARKS)
                .slice(13,15).map(index => results.poseLandmarks[index]),
                {visibilityMin: 0.65, color: corArticulacao,});
            
            drawingUtils.drawLandmarks(
                canvasCtx,
                Object.values(mpPose.POSE_LANDMARKS)
                    .slice(15,22).map(index => results.poseLandmarks[index]),
                {visibilityMin: 0.65, color: corPadrao,});
        
            drawingUtils.drawLandmarks(
                canvasCtx,
                Object.values(mpPose.POSE_LANDMARKS)
                .slice(23,25).map(index => results.poseLandmarks[index]),
                {visibilityMin: 0.65, color: corPostura,});
        
                if (info.length != 0) {
                canvasCtx.font = "23px Arial";
                canvasCtx.fillStyle = corPadrao
                canvasCtx.fillText("Repetions: " + info.count, 40, 40);
                canvasCtx.font = "20px Arial";
                canvasCtx.fillStyle = corTempo;
                canvasCtx.fillText("Up: " + info.timeUp + " s", 440, 40);
        
                canvasCtx.font = "20px Arial";
                canvasCtx.fillStyle = corTempo;
                canvasCtx.fillText("Down: " + info.timeDown + " s", 540, 40);
        
                canvasCtx.font = "20px Arial";
                canvasCtx.fillStyle = corPadrao
                canvasCtx.fillText("angulo: " + info.mainAngle + " °", 200, 40);
                }
                canvasCtx.restore();
        }
    
        contImage = contImage + 1;
      
        return false;
    }

    function setInitial(results) {
        cont = cont + 1;
        const pose = new Pose({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }});

        pose.setOptions({
        modelComplexity: 1, // 0 ou 0.5 ?
        smoothLandmarks: true, // mudar isso ajudará?
        enableSegmentation: true, //false
        smoothSegmentation: true, // mudar isso ajudará?
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
        });

        pose.onResults(onResults);

        if (typeof webcamRef.current.video !== "undefined" &&
            webcamRef.current.video !== null && !finaliza) {
            camera = new cam.Camera(webcamRef.current.video, { 
            onFrame: async () => {
                await pose.send({image: webcamRef.current.video});
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }
    }


    useEffect(() => {
        setInitial();
    }, [finaliza]);

    useEffect(() => {
        if(successVideo0) {
            history.push('/resume')
        }
    }, [successVideo0]);

    const pauseVideo = (e) => {
        e.preventDefault()
    }

    const stopVideo = (e) => {
        e.preventDefault()
        for (let i=0; i<3; i++) { 
            dispatch(stopPersonal(1, Number(i)))
        }
        webcamRef.current.video.srcObject.getTracks()[0].stop()
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
        <Row>
        <Col md={8} style={{ height: '70vh' }}>
            <h1>Execução Exercício</h1>

            <Webcam 
                ref={webcamRef}
                audio={false}
                style={{
                    position: "absolute",
                    width: '90%',
                    height: '90%'
                }} 
            />
            
             <canvas
                ref={canvasRef}
                style={{
                   position: "absolute",
                   width: '90%',
                   height: '90%'
                }}
            />
            <br/>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup.Item>
                    <Row>
                        <Col md={6}>
                            <Button className="float-right" type='submit' variant='danger' onClick={ (e) => stopVideo(e)}>
                                Parar
                            </Button>
                        </Col>
                        <Col md={5}>
                            <Button className="float-right" type='submit' variant='warning' onClick={(e) => pauseVideo(e)}>
                                Pausar
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </Card>
        </Col>
        </Row>
    </div>
    )

}
export default RecordPersonalScreen