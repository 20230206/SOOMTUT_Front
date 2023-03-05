import styles from "../../assets/styles/components/inputs/searchbar.module.css"

import { Button, DropdownButton, Form, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useState } from "react";

function SearchBar () {
    const [dropMenu, setDropMenu] = useState("서울");

    return(    
      <Form>
        <InputGroup>
        <DropdownButton
          title={dropMenu}
          >
          <DropdownItem onClick={() => setDropMenu("서울")} > 서울 </DropdownItem>
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
          className={styles.inputbox}
        />

        <Button>
            검색
        </Button>
        </InputGroup>
      </Form>);
}
export default SearchBar;