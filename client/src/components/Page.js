function Page({ number, onPageChange }) {

  const handleButtonClick = () => {
    onPageChange(number);
  }

  return (
    <div className="pageButtons">
      <button onClick={handleButtonClick}>{number}</button>
    </div>
  );
}
export default Page;
