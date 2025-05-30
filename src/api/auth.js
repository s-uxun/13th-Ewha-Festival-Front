import Cookies from 'js-cookie';

// 카카오 로그인 URL
export const getKakaoAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    response_type: 'code'
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

// <로그인> 함수
export const handleLogin = (accessToken, refreshToken, userData) => {
  Cookies.set('accessToken', accessToken, { expires: 3 });
  Cookies.set('refreshToken', refreshToken, { expires: 7 });
  localStorage.setItem('user', JSON.stringify(userData));
};

// <로그아웃> 함수
export const handleLogout = () => {
  Cookies.remove('accessToken');
  localStorage.removeItem('user');
  window.location.href = '/';
};

// <로그인 여부 확인> 함수
export const isLoggedIn = () => {
  return !!Cookies.get('accessToken');
};

// <사용자 정보 추출> 함수
export const getUserInfo = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export default {
  getKakaoAuthUrl,
  handleLogin,
  handleLogout,
  isLoggedIn,
  getUserInfo
};
