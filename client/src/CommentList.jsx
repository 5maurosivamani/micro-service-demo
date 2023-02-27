import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList({ comments }) {


  const rendedComments = comments.map((item, index) => {
    if(item.status === 0){
      return <li class="list-group-item">Waiting for Moderation...</li>;
    }else if(item.status === 2){
      return <li class="list-group-item">Rejected</li>;
    }else if(item.status === 1){
      return <li class="list-group-item">{item.comment}</li>;
    }
    
  });

  return <ul class="list-group list-group-numbered mt-4">{rendedComments}</ul>;
}

export default CommentList;
