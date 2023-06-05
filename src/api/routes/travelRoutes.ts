import { Router } from 'express';
import {
  createTravelPlanController,
  getTravelPlanController,
  updateTravelPlanController,
  deleteTravelPlanController,
  deleteTravelLocationController,
  updateTravelLocationController,
} from '../../controllers/travelController';
import { validateToken } from '../middlewares/jwt';

const router = Router();

// 여행 일정 등록
router.post('/', validateToken, createTravelPlanController);

// 여행 일정 조회
router.get('/', validateToken, getTravelPlanController);

// 여행 일정 수정
router.put('/:plan_id', validateToken, updateTravelPlanController);

// 특정 날짜 장소 수정
router.put('/location/:plan_id/:date', validateToken, updateTravelLocationController);

// 여행 일정 삭제
router.delete('/:plan_id', validateToken, deleteTravelPlanController);

// 특정 날짜 장소 삭제
router.delete('/location/:plan_id/:date', validateToken, deleteTravelLocationController);

export default router;

// GET /travelPlans : 모든 여행일정을 조회합니다.
// POST /travelPlans : 새로운 여행일정을 생성합니다. @@@@@
// GET /travelPlans/:plan_id : 특정 여행일정을 조회합니다.
// PUT /travelPlans/:plan_id : 특정 여행일정을 수정합니다.
// DELETE /travelPlans/:plan_id : 특정 여행일정을 삭제합니다.
// GET /travelPlans/:plan_id/locations : 특정 여행일정의 모든 장소를 조회합니다.
// POST /travelPlans/:plan_id/locations : 특정 여행일정에 새로운 장소를 추가합니다.