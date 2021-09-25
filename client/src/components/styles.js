import styled from "styled-components";

export const DropdownWrapper = styled.form`
  margin: 0 auto;
`;

export const StyledSelect = styled.select`
  max-width: 50%;
  height: 50%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;

export const StyledLabel = styled.label`
  margin: 0 auto;
`;
