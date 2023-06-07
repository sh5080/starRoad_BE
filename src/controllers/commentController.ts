import { NextFunction, Request, Response } from 'express';
import * as commentService from '../services/commentService';
import { getOneDiary } from '../services/diaryService';
import { AppError, CommonError } from '../types/AppError';
import { CustomRequest } from '../types/customRequest';

export const createCommentController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { diary_id, comment } = req.body;

    const loggedInUserId = req.user?.username;
    if (!loggedInUserId) {
      throw new AppError(CommonError.AUTHENTICATION_ERROR, '인증되지 않은 사용자입니다.', 401);
    }

    const diary = await getOneDiary(Number(diary_id));
    if (!diary) {
      throw new AppError(CommonError.RESOURCE_NOT_FOUND, '유효하지 않은 여행기입니다.', 404);
    }

    const createdCommentId = await commentService.createComment({
      username: loggedInUserId,
      diary_id,
      comment,
    });

    res.status(201).json({ id: createdCommentId, message: '댓글이 생성되었습니다.' });
  } catch (error) {
      switch (error) {
        case CommonError.AUTHENTICATION_ERROR:
          next(new AppError(CommonError.AUTHENTICATION_ERROR, '인증되지 않은 사용자입니다.', 401));
          break;
        case CommonError.RESOURCE_NOT_FOUND:
          next(new AppError(CommonError.RESOURCE_NOT_FOUND, '유효하지 않은 여행기입니다.', 404));
          break;
        default:
          console.error(error)
          next(error);
      }
    };
}
export const getCommentsByDiaryController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { diary_id } = req.params;
    const { page, limit } = req.query;
    const comments = await commentService.getCommentsByDiary(Number(diary_id), Number(page), Number(limit));
    res.status(200).json({ comments });
  } catch (error) {
    switch (error) {
      case CommonError.AUTHENTICATION_ERROR:
        break;
      default:
        console.error(error);
        next(error);
    }
  }
};
export const getAllCommentsController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    switch (error) {
      case CommonError.AUTHENTICATION_ERROR:
        break;
      default:
        console.error(error);
        next(new AppError(CommonError.UNEXPECTED_ERROR, '댓글 조회 실패했습니다.', 500));
    }
  }
};
export const updateCommentController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { comment_id } = req.params;
    const { comment } = req.body;
    const username = req.user?.username;
    if (!comment) {
      throw new AppError(CommonError.INVALID_INPUT, '댓글을 입력해 주세요.', 400);
    }
    await commentService.updateComment({ comment }, Number(comment_id), username as string);
    res.status(200).json({ message: '댓글이 성공적으로 수정되었습니다.' });
  } catch (error) {
    switch (error) {
      case CommonError.INVALID_INPUT:
      next(error);
      break;
      default:
        console.error(error);
        next(new AppError(CommonError.UNEXPECTED_ERROR, '댓글 수정에 실패했습니다.', 500));
    }
  }
};

export const deleteCommentController = async (req: CustomRequest, res: Response) => {
  try {
    const { comment_id } = req.params;
    const username = req.user?.username;

    if (!username) {
      throw new AppError(CommonError.AUTHENTICATION_ERROR, '사용자 정보를 찾을 수 없습니다.', 401);
    }
    await commentService.deleteComment(Number(comment_id), username);
    res.status(200).json({ message: '댓글 삭제가 완료되었습니다.' });
  } catch (error) {
    switch (error) {
      case CommonError.AUTHENTICATION_ERROR:
        break;
      default:
        console.error(error);
        new AppError(CommonError.UNEXPECTED_ERROR, '댓글 삭제에 실패했습니다.', 500);
    }
  }
};
