import styles from "../../assets/styles/components/inputs/searchbar.module.css"

import { Button, DropdownButton, Form, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar () {
    const [dropMenu, setDropMenu] = useState("서울");

    const [keyword, setKeyword] = useState("");
    const OnChangeKeyword = (e) => setKeyword(e.target.value);

    const navigate = useNavigate();

    return(    
      <Form className={styles.form}>
        <InputGroup>
        <DropdownButton
          className={styles.searchbutton}
          title={dropMenu}
          >
          <DropdownItem onClick={() => setDropMenu("서울")} > 서울 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("인천")} > 인천 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("경기")} > 경기 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("강원")} > 강원 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("충북")} > 충북 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("충남")} > 충남 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("대전")} > 대전 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("경북")} > 경북 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("대구")} > 대구 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("경남")} > 경남 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("부산")} > 부산 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("전북")} > 전북 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("광주")} > 광주 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("전남")} > 전남 </DropdownItem>
          <DropdownItem onClick={() => setDropMenu("제주")} > 제주 </DropdownItem>
        </DropdownButton>

        <Form.Control
          value={keyword}
          className={styles.inputbox}
          placeholder="키워드 검색하기..."
          onChange={OnChangeKeyword}
        />

        <Button
          className={styles.searchbutton}
          onClick={()=>navigate(`/lectures?mode=search&region=${dropMenu}`)}>
            검색
        </Button>
        </InputGroup>
      </Form>);
}
export default SearchBar;