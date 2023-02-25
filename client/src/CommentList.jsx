import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList({ comments }) {


  const rendedComments = comments.map((item, index) => {
    return <li class="list-group-item">{item.comment}</li>;
  });

  return <ul class="list-group list-group-numbered mt-4">{rendedComments}</ul>;
}

export default CommentList;
