import { useState, useEffect } from "react";
import axios from "axios";

function SearchTravel() {
    const [searchText, setSearchText] = useState([]);
    const [serchResult, setSearchResult] = useState([]);

    useEffect (() => {
        if (searchText) {
            searchFromServer(searchText)
        }
    }, [searchText]);

    const searchFromServer = async (text) => {
        try {
            const response = await axios.get(
                `http://localhost:4001/trips?keywords=${text}`
            );
            setSearchResult(response.data.data)
        } catch (error){
            console.log(error)
        }
    };

    const handleClickButton = (keyword) => {
        setSearchText((prevText) => `${prevText} ${keyword}`.trim());
    };

    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            alert(`ลิ้งค์${link}ถูกคัดลอกแล้ว`)
        }, (error) => {
            alert(`คัดลอกลิ้งค์ไม่สำเร็จ`, error)
        });
    }

    return(
        <div>
           <div className="app-header">
               <h1>เที่ยวไหนดี</h1>
               <label className="app-header-searching">
               <h4>ค้นหาที่เที่ยว</h4>
               <input 
                type="text"
                className="app-header-input"
                placeholder="หาที่เที่ยวแล้วไปกัน..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}/>
               </label>
           </div>
           <div className="travel-list">
           {serchResult.map((item) => {
               return(
                <div className="travel" key={item.eid}>
                    <div className="travel-picture">
                        {item.photos.map((photo, index) => 
                            index === 0 ? (
                                <img src={photo} key={index} className="first-image"/>
                            ) : null
                        )}
                    </div>
                    <div className="travel-detail">
                        <h1>
                            <a href={item.url} target="_blank">{item.title}</a>
                        </h1>
                        <p>{item.description.slice(0, 100)} ...</p>
                        <a href={item.url} target="_blank" className="readmore">อ่านต่อ</a>
                        <div className="travel-detail-tags">
                            <p>หมวดหมู่</p>
                            {item.tags.map((tag, index) => (
                                <button key={index} className="button-tags" onClick={() => handleClickButton(tag)}>
                                  {tag}
                                </button>
                            ))}
                        </div>
                        <div className="travel-detail-image">
                            {item.photos.map((photo, index) => 
                            index !== 0 ? (
                                <img src={photo} key={index} className="detail-image"/>
                            ) : null
                            )}
                        </div>
                        <div className="copylink-icon">
                            <img src="/icon/link.png" onClick={() => copyToClipboard(item.url)} />
                        </div>
                    </div>
                </div>
               );
           })}
           </div>
        </div>
    );
}

export default SearchTravel;