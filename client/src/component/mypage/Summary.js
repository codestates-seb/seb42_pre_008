import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Summary = () => {
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        fetch(`/accounts/${id}`)
        .then((res) => {
            if(!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((profile) => {
            setProfile(profile);
        })
        .catch((err) => {
            console.error(err.message);
        })
    }, []);

    useEffect(() => {
        fetch(`/answers/account/${id}?page=1&size=5&sort=id%2Cdesc`)
        .then((res) => {
            if(!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((answers) => {
            setAnswers(answers);
        })
        .catch((err) => {
            console.error(err.message);
        })
    }, []);

    const answersContent = answers?.content;

    useEffect(() => {
        fetch(`/questions/account/${id}?page=1&size=5&sort=id%2Cdesc`)
        .then((res) => {
            if(!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((questions) => {
            setQuestions(questions)
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, []);

    const questionsContent = questions?.content;
    const options = {month: 'short', day: 'nuimeric', year: 'numeric'}

    return (
        
    )






}

export default Summary;