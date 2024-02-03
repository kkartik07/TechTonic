import React, { useState } from 'react'
import './NewPost.css'
import { Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
function NewPost() {
    const [title,setTitle]=useState("")
    const [tags,setTags]=useState([])
    const [content,setContent]=useState("")
    const tagArray = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue", label: "Vue.js" },
    { value: "NodeJS", label: "Node.js" },
    { value: "Express", label: "Express.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Ruby", label: "Ruby" },
    { value: "RubyOnRails", label: "Ruby on Rails" },
    { value: "PHP", label: "PHP" },
    { value: "Laravel", label: "Laravel" },
    { value: "Java", label: "Java" },
    { value: "Spring", label: "Spring Framework" },
    { value: "C#", label: "C#" },
    { value: ".NET", label: ".NET" },
    { value: "Swift", label: "Swift" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Flutter", label: "Flutter" },
    { value: "VueNative", label: "Vue Native" },
    { value: "ReactNative", label: "React Native" },
    { value: "Xamarin", label: "Xamarin" },
    { value: "TensorFlow", label: "TensorFlow" },
    { value: "PyTorch", label: "PyTorch" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "AWS", label: "Amazon Web Services" },
    { value: "Azure", label: "Microsoft Azure" },
    { value: "GoogleCloud", label: "Google Cloud Platform" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "SmartContracts", label: "Smart Contracts" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "EthicalHacking", label: "Ethical Hacking" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "RESTAPIs", label: "REST APIs" },
    { value: "Serverless", label: "Serverless" },
    { value: "Microservices", label: "Microservices" },
    { value: "CI/CD", label: "Continuous Integration/Continuous Deployment" },
    { value: "Jenkins", label: "Jenkins" },
    { value: "Git", label: "Git" },
    { value: "VersionControl", label: "Version Control" },
  ];
      
      const [selectedOptions, setSelectedOptions] = useState([]);
      function handleSelect(data) {
        setSelectedOptions(data);
        setTags((prev)=>data)
      }
    const navigate=useNavigate()
    const handleSubmit=async()=>{
        const author=localStorage.getItem('username');
        if(!author){console.log('Login first'); return;}
        const body={
            content,
            title,
            author,
            tags
        }
        const headers = {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
        };
        try{
            const response=await axios.post('http://localhost:3001/posts',
            body,{headers:headers});
            if(response){
                setContent('');
                setTitle('');
                setTags([])
                navigate(`/posts/${response.data._id}`,{replace:true})
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
    <div className='newpost'>
      <div id='form'>
        <textarea value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='New Post Title here...' id='title'/>
        <div className="dropdown-container">
        <Select
        options={tagArray}
        placeholder="Add tags for you post"
        value={selectedOptions}
        onChange={handleSelect}
        isSearchable={true}
        isMulti
        id='tagsS'
        theme={(theme) => ({
            ...theme,
            borderRadius: 10,
            colors: {
              ...theme.colors,
              primary25: 'lightblue',
              primary: '#1976D2',
            },
          })}
        />
    </div>
        <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} placeholder='Write your post content here...'/>
      <Button variant='contained' id='publish' onClick={handleSubmit}>Publish</Button>
      </div>
      <div id='tip'>
      <h2>Crafting an Engaging Post Title</h2>
Consider your post title as a concise yet captivating summary — a quick glimpse into the essence of your post captured in a single sentence. Strategically integrate keywords to enhance searchability and reach a broader audience.
      </div>
    </div>
    </>
    )
}

export default NewPost
