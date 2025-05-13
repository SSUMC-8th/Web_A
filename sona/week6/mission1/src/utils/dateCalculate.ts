export default function getTimePassed(createdAt: Date) {
  //   const formattedDate = createdAt.replace(/\./g, "-");
  const diff = new Date().getTime() - createdAt.getTime(); //ms변환

  const sec = diff / 1000; //초
  const min = sec / 60; //분
  const hours = min / 60; //시간
  const days = hours / 24; //일

  if (min < 0) {
    return "방금 전";
  } else if (min < 60) {
    return `${Math.round(min)}분 전`;
  } else if (hours < 24) {
    return `${Math.round(hours)}시간 전`;
  } else if (days < 2) {
    return "하루 전";
  } else {
    return "며칠 전";
  }
}
