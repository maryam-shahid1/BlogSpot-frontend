import React, {Component} from 'react';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class CreatePost extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      text: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
  },
 
    this.formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]
  }
  
  handleChange(value){
    this.setState({text: value});
  }


  render(){
    console.log(this.state.text);
    return <div>
      <Navbar/>
      <ReactQuill value={this.state.text}
        modules={this.modules}
        formats={this.formats}
        onChange={this.handleChange}/>
      <Footer/>
    </div>
  }
}

export default CreatePost;
