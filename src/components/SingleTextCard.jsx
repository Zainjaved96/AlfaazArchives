import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SingleTextCard = (props) => {
  const {textObj,  handleDeleteText} = props
  const {text, id, tag, created_at} = textObj
  const [isCopied, setIsCopied] = useState(false);
  console.log(tag, created_at)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000); // Reset after 3 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };



  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{text}</Card.Title>
          
          <div className='d-flex gap-2'>
            <Button  className='mt-auto'
              variant={isCopied ? "success" : "primary"} 
              onClick={handleCopy}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>

            <Button  className='mt-auto'
              variant="danger"
              onClick={() => handleDeleteText(id)}
            >
              Delete
            </Button>

          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleTextCard;
