
import { useState } from 'react';
import './Buttons.css';
import buttonsData from './buttonsData.json';

function Buttons() {
    const[buttonArea,setButtonArea] = useState('symptoms')
    const[symptomsId,setSymptomsId] = useState(1)
    const[answerArea,setAnswerArea] = useState('Hausa text are pronounced exactly as they are written')
   

    let buttonsObj = buttonsData;
    let chosedSymptom = buttonsObj[symptomsId-1]

    const showHausa = (qposition) => {
        let question = chosedSymptom.questions.find(q => q.id===qposition);
        setAnswerArea(question?.hausa)
    }

    const enterCategory = (position) => {
        setButtonArea('questions')
        setSymptomsId(position)
    }

    const goBack = () => {
        setButtonArea('symptoms')
        setAnswerArea('Hausa text are pronounced exactly as they are written')
    }

    let goBackButton = 
            <div>
                <button className='goback' onClick={() => goBack()}>back</button>
            </div>

    let symptomsButtons = buttonsObj.map((item) => (
        <div className="button" key={item.id}>
            <button value={item.eng} onClick={() => enterCategory(item.id)}>{item.eng}</button>
        </div>
    ))

    let questionButtons =
        <div className="button">
            {/*<button value={item.questions.map.eng} onClick={() => enterCategory(item.id)}>{item.questions[1].eng}</button>*/
            chosedSymptom.questions.map((qItem) => (
                <div className='qbuttons' key={qItem.id}>
                <button value={qItem.eng} id={qItem.id} onClick={() => showHausa(qItem.id)}>{qItem.eng}</button>
                </div>
            ))
            }
        </div>

    return(
        <div>
            <div className='answer-area'>{answerArea}</div>
            <div className='buttons'>
                {buttonArea === 'symptoms' ? <div className='cqdiv'>{symptomsButtons}</div> : [
                    <div className='backdiv'>{goBackButton}</div>,
                    <div className='cqdiv'>{questionButtons}</div>]}
            </div>
            <div>
                
            </div>
            </div>
    )
}

export default Buttons;