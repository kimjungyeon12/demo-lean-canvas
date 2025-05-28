import dayjs from 'dayjs';
import { canvases } from './http'
import { v4 as uuid } from 'uuid'



//목록조회
export async function getCanvases(params) {
  const payload = Object.assign({
    _sort: 'lastModified',
    _order: 'desc',
    // _limit: 20
  }, params
  );
  const { data } = await canvases.get('/', { params: payload });
  return data;
}

//등록
export function createCanvas() {
  const newCanvas = {
    title: uuid().substring(0, 4) + "새로운 린 캔버스",
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규'
  }
  return canvases.post('/', newCanvas)
};

//삭제
export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`);
  console.log('삭제 시도하는 ID:', id);
};


export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
};


export async function updateTitle(id, title) {
  await canvases.patch(`/${id}`, { title });
};


export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}