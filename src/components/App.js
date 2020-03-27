import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Axios from 'axios';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.search = this.search.bind(this);
  }
  
  componentDidMount() {
    Axios.get(`${this.state.baseUrl}/posts`).then(res =>{
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(id, post) {
    let newPost = {
      text: post
    }
    Axios.put(`${this.state.baseUrl}/posts?id=${id}`, newPost).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    Axios.delete(`${this.state.baseUrl}/posts?id=${id}`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    Axios.post(`${this.state.baseUrl}/posts`, { text }).then(res =>{
      this.setState({
        posts: res.data
      })
    })
  }

  search(e){
    Axios.get(encodeURI(`${this.state.baseUrl}/posts/filter?text=${e.target.value}`)).then(res=>{
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    console.log(this.state)
    const { posts } = this.state;
    const postArray = posts.map(post => (
      <Post key={post.id} 
            text={post.text} 
            date={post.date}
            id={post.id} 
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}/>))
    return (
      <div className="App__parent">
        <Header search={this.search}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {postArray}
        </section>
      </div>
    );
  }
}

export default App;
