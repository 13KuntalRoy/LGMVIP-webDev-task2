import React, { useState, useEffect, useCallback } from 'react'
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader"
import { css } from "@emotion/react";
import giphyAnime from './../../assets/giphy.gif';
const override = css`
  display:center;
  left:50;
  top:50;
 height:100vh;
 width:100%;
  border-color: red;
`;

const Home = () => {
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [Userdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadMore = () => {
        setPage(page + 1);
    };
    const loadless = () => {
        setPage(page - 1);
    };


    const getUserdata = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`)
            if (!response.ok) {
                throw new Error(" Something went Worng!")
            }
            setUserdata(await response.json());
        }
        catch (error) {
            setError(error.message);
          
        }

        setLoading(false)
    }, [page])

    useEffect(() => {
        getUserdata();
    }, [getUserdata]);
    console.log(Userdata);
    
    // console.log(Userdata.data[4].first_name);
    return (
        <> <Nab><Btn onClick={getUserdata}>Refresh</Btn>
            {page === Userdata.total_pages ? <Btn onClick={loadless}>previous page</Btn>
                :
                <Btn onClick={loadMore}>next page</Btn>}
        </Nab>
            {
                !loading && Userdata.length === 0 &&
                <div 
                style={{height:"80vh"}}
                >                    
                <img src={ giphyAnime}
                        alt="404"
                        style={{height:"300px"}}
                    /> <h2
                    style={{color:"white",
                    fontSize:"55px"}}
                  >NO DATA FOUND <span style={{color:'red'}}>{error}</span></h2>
                    </div>
            }
            {loading ?

                <HashLoader color={"orange"} loading={loading} css={override} size={90} />

                :
                (<Main>
                    {
                        Userdata?.data?.map((curElem ,i) => {
                            console.log(curElem.email);
                            return (

                                <Card key={i}>
                                    <ImgContainer >
                                        <img src={curElem.avatar} alt="flag" />
                                    </ImgContainer>
                                    <DataContainer>
                                        <h2>{curElem.first_name} {curElem.last_name} </h2>

                                    </DataContainer>
                                </Card>


                            )
                        }
                        )
                    }
                </Main>
                )}


        </>


    )
}

export default Home
const Main = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 44px;
    align-self: center;
    justify-content: center;
`
const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin:10px;
width:350px;
height:350px;
${'' /* background-color:white; */}
background-color: #a55c1b;
background-image: linear-gradient(315deg, #a55c1b 0%, #000000 74%);
overflow: hidden;
box-shadow: 0 2px 20px #787878;
 ${'' /* border-radius: 25px; */}
 cursor: pointer;
 transition: transform 200ms ease-in;
`
const ImgContainer = styled.div`
img{
height:200px;
width:250px;
padding:.5%;

}
`
const DataContainer = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap');
font-family: 'Yeseva One', cursive;
height:100px;
font-size:15px;
text-transform:uppercase;

`
const Nab = styled.div`{
    width:100%;
    height:60px;
    background-color:black;
    display:flex;
    align-items:center;
    justify-content:center;
}
`
const Btn = styled.button`
  color:white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  margin:10px;
  cursor:pointer;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover{
 border-color:transparent;
  opacity: 1;
  transition-duration: 1s;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  
}
&:hover{
  z-index: 1;
  animation: glow 8s linear infinite;
    
}
@keyframes glow {
  0%{
    background-position: 0%;
  }
  100%{
    background-position: 400%;
  }
}
`;