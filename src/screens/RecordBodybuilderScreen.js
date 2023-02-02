import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Webcam from "react-webcam";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import types from '../messages'
import ModalResults from '../components/ModalResults'

import * as mpPose from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import api from '../services/api';
import { stopBodybuilder } from '../actions/videoActions';
import { createExerciseDone, createSerie, createArticulation } from '../actions/exerciseDoneActions'

function RecordBodybuilderScreen({ location, history }) {

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
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState([]);
  const [stop, setStop] = useState(false);
  let camera;
  const [modalShow, setModalShow] = React.useState(false);

  const dispatch = useDispatch()

  // const exerciseInicialize = useSelector(state => state.exerciseInicialize)
  // const { exercise } = exerciseInicialize

  const exerciseDetails = useSelector(state => state.exerciseDetails)
  const { loading, error, exercise } = exerciseDetails

  const articulationsDetails = useSelector(state => state.articulationsDetails)
  const { loadingArticulations, errorArticulations, articulations } = articulationsDetails

  const videoStopBodybuilder = useSelector(state => state.videoStopBodybuilder)
  const { loadingVideo, video } = videoStopBodybuilder

  const exerciseDoneCreate = useSelector(state => state.exerciseDoneCreate)
  const {   successExerciseDone, exerciseDone, 
            successSerie, serie, successArticulation, 
            articulation
        } = exerciseDoneCreate

  if (!articulations[0]) {
      history.push(`/exercise/${exercise._id}`)
  }

  // enviar todas as informações do exericios do professor para comparar
  // confirmar se esse cod está funcionando

  async function sendHumanPoints(results){

      if(!finaliza) {
          console.log("finaliza", finaliza)
          await api.post(`/pointsHuman/builder/${exercise._id}`, {results})
          .then(res => {
            if (Number(res.data[1]) != -1) {
              info = res.data; 
              setMessages(res.data.message);
              console.log(messages, res.data)
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

    const pauseVideo = (e) => {
        e.preventDefault()
    }

    const stopVideo = (e) => {
        e.preventDefault()
        dispatch(stopBodybuilder(exercise._id))
        webcamRef.current.video.srcObject.getTracks()[0].stop()
    }

    useEffect(() => {
      setInitial();
    }, [finaliza]);
    console.log("video", video, video.mediaTimeUp)
    useEffect(() => {

        if(video) {
            console.log("0", )
            dispatch (createExerciseDone ({
                exercise_id: exercise._id,
                //finish_serie: +1 vai ter que buscar o exercicio_done, caso não exista é 0
            }))
        }
    }, [video]) 

    useEffect(() => {

        if(successExerciseDone) {
            console.log("1", successExerciseDone, exerciseDone, 
            successSerie, serie, successArticulation, 
            articulation) 
            dispatch (createSerie ({
                exercise_done_id: exerciseDone._id,  
                timeUpMedia: video.mediaTimeUp,  
                timeUpSD: 0, 
                timeDownMedia: video.mediaTimeDown,
                timeDownSD: 0,  
            }))
        }
    }, [successExerciseDone])

    useEffect(() => {

        if(successSerie  && articulations[0]._id) {
            console.log("2", successExerciseDone, exerciseDone, 
            successSerie, serie, successArticulation, 
            articulation)
            dispatch (createArticulation ({
                serie_id: serie._id, 
                articulation_id: articulations[0]._id, 
                angleUpMedia: video.mediaUpFirst, 
                angleUpSD: 0,
                angleDownMedia: video.mediaDownFirst, 
                angleDownSD: 0 
            }))
            dispatch (createArticulation ({
                serie_id: serie._id, 
                articulation_id: articulations[1]._id, 
                angleUpMedia: video.mediaUpSecond, 
                angleUpSD: 0,
                angleDownMedia: video.mediaDownSecond, 
                angleDownSD: 0 
            }))
            dispatch (createArticulation ({
                serie_id: serie._id, 
                articulation_id: articulations[2]._id, 
                angleUpMedia: video.mediaUpThird, 
                angleUpSD: 0,
                angleDownMedia: video.mediaDownThird, 
                angleDownSD: 0 
            }))
            setModalShow(true)
            //history.push('/')
        }
    }, [successSerie])


  // salvar o exercício baseado no personal, e alguma coisa de séries compridas a cada vez que faz, como field
  // contagem servir para finalizar tb, cores de moldarem ao level
  // criar modal que tenha mensagens e não números

    return (
      <Row>
        <Col md={8} style={{ height: '70vh' }}>
            <h1>Execução Exercício</h1>
            <Webcam 
                ref={webcamRef}
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
            <h1>Feedback  </h1>
            <Card>
                {messages && messages.map ( (message, index) => (
                  <ListGroup.Item>
                    <h5>{types[index].type}</h5> 
                    <h7>{message}</h7> 
                  </ListGroup.Item>
                ))}
                  <ListGroup.Item>
                    <Row>
                        <Col md={6}>
                            <Button className="float-right" type='submit' variant='danger' onClick={ (e) => stopVideo(e)}>
                                Stop
                            </Button>
                        </Col>
                        <Col md={5}>
                            <Button className="float-right" type='submit' variant='warning' onClick={ (e) => pauseVideo(e)}>
                                Pause
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </Card>
        </Col>
        <>
            <ModalResults
              show={modalShow}
              onHide={() => setModalShow(false)}
              results={video}
            />
        </>
      </Row>
    )

}
export default RecordBodybuilderScreen