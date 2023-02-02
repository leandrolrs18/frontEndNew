import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalResults({show, onHide, results}) {
  return (
    <Modal
      {...{show, onHide}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Resultados 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br/>
        <h6> <strong>Série:</strong> 2/3   |   <strong>Repetições:</strong> 8/9</h6>
        <br/>
        <h4>Você precisa melhorar em: </h4>
        {results.alertMessagens(item => (
                {item} =! "ok" ? 
                <p>
                {item}
                </p>
                :
                <br/>
            ))
        }
        {/* {results.percentmediaUpFirst < 50 ?
            <p>
                Subida: tente não subir tanto!
            </p>
        :
        results.percentmediaUpFirst > 85 ? 
            <p>
                Subida: continue assim!
            </p>
        :
            <p>
                Subida: boa, mas ainda pode melhorar!
            </p>
        }

        {results.percentmediaDownFirst < 50 ?
            <p>
                Descida: tente não descer tanto!
            </p>
        :
        results.percentmediaDownFirst > 85 ? 
            <p>
                Descida: continue assim!
            </p>
        :
            <p>
                Descida: mas ainda pode melhorar!
            </p>
        }
        <h4>Articulações Secudárias</h4>
        {results.percentmediaUpSecond < 50 ?
            <p>
                Cotovelo: aproxime mais para frente!
            </p>
        :
        results.percentmediaUpSecond > 85 ? 
            <p>
                Cotovelo: continue assim!
            </p>
        :
            <p>
                Cotovelo: bom posicionado, mas ainda pode melhorar!
            </p>
        }

        {results.mediaDownSecond < 50 ?
            <p>
                Cotovelo: aproxime mais para trás!
            </p>
        :
        results.mediaDownSecond > 85 ? 
            <p>
                Cotovelo: continue assim!
            </p>
        :
            <p>
                Cotovelo: bom posicionado, mas ainda pode melhorar!
            </p>
        }
        <h4>Postura</h4>
        {results.percentmediaUpThird < 50 ?
            <p>
                Coluna: aproxime mais para frente!
            </p>
        :
        results.percentmediaUpThird > 85 ? 
            <p>
                Coluna: continue assim!
            </p>
        :
            <p>
                Coluna: bom posicionado, mas ainda pode melhorar!
            </p>
        }

        {results.mediaDownThird < 50 ?
            <p>
                Coluna: aproxime mais para trás!
            </p>
        :
        results.mediaDownThird > 85 ? 
            <p>
                Coluna: continue assim!
            </p>
        :
            <p>
                Coluna: bom posicionado, mas ainda pode melhorar!
            </p>
        }
        <h4>Tempo</h4>
        {results.percentTimeUp < 50 ?
            <p>
                Subida: tente ir mais rápido!
            </p>
        :
        results.percentTimeUp > 85 ? 
            <p>
                Subida: continue assim!
            </p>
        :
            <p>
                Subida: bom, mas ainda pode melhorar!
            </p>
        }

        {results.percentTimeDown < 50 ?
            <p>
                Descida: tente ir mais rápido!
            </p>
        :
        results.percentTimeDown > 85 ? 
            <p>
                Descida: continue assim!
            </p>
        :
            <p>
                Descida: bom, mas ainda pode melhorar!
            </p>
        } */}

      </Modal.Body>
      <Modal.Footer>
        <h6>...Em 57 segundos você será direcionado para página do próximo exercício</h6>
        <br/>
        <br/>
        <Button onClick={onHide}>Ir para o próximo exercício </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResults