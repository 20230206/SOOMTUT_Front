import axios from "axios";

import React, {
    useState,
    useEffect
} from "react";

import LectureContainer from "./containers/LectureContainer";
import CustomPagination from "./paginations/CustomPagination";

function Bookmark() {
    
    const [loading, setLoading] = useState(false);
    const SetLoading = () => { setLoading(true); }
    const [curPage, setCurPage] = useState(1);
    const [lectures, setLectures] = useState(null)
    const [lectureChunk, setLectureChunk] = useState(null);

    const GetLectures = (page) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/bookmark?page=${page-1}&size=10`,
            headers: { 
                'Authorization': localStorage.getItem("Access")
            }
        };

        axios(config)
        .then(function (response) {
            setLectures(response.data.data.content);
            setPages(response.data.data.totalPages);
            if(!loading) SetLoading(true);
        })
        .catch(function (error) {
        });
    }

    const [pages, setPages] = useState(null);
    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])
    
    const SetCurPage = (event) => {
        setCurPage(event);
        GetLectures(event);
    }


    const Rechunck = () => {
        const chunkSize = 5;
        const chunkedData = [];

        if(lectures) {
            for (let i = 0; i < lectures.length; i += chunkSize) {
              const chunk = lectures.slice(i, i + chunkSize);
              chunkedData.push(chunk);
            }

            if (chunkedData.length > 1 && chunkedData[chunkedData.length - 1].length < chunkSize) {
              const lastChunk = chunkedData.pop();
              const lastChunkSize = lastChunk.length;
              const prevChunkSize = chunkSize - lastChunkSize;
              const prevChunk = chunkedData[chunkedData.length - 1].slice(0, prevChunkSize);
              const newLastChunk = prevChunk.concat(lastChunk);
              chunkedData[chunkedData.length - 1] = newLastChunk;
              chunkedData.push(lastChunk);
            }
            setLectureChunk(chunkedData);
        }
    }
    useEffect(() => {
        Rechunck();
    }, [lectures])

    const CreateLectureContainers = () => {
        if(lectureChunk) {
            var arr = [];
            lectureChunk.map((item, index) => {
                arr.push(
                  <div
                   key={index} 
                   style={{display:"flex"}}
                  >
                    <LectureContainer 
                      key={index}
                      lectures={item}
                    >

                    </LectureContainer>
                  </div>
                )
            })
            return arr;
        }
    }


    return (
        <div
          style={{
            width:"1000px",
            height:"80vh"
        }}>
            <div
              style={{
                margin: "30px 0px 30px 0px",
                width:"1000px",
                height:"680px"
              }}
            >
                <CreateLectureContainers />
            </div>
            
            <div style={{width:"1000px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Paging />
            </div>
        </div>
    );
}

export default Bookmark;