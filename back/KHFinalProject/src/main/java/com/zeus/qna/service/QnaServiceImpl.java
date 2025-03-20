package com.zeus.qna.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.qna.domain.Qna;
import com.zeus.qna.domain.QnaDTO;
import com.zeus.qna.mapper.QnaMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class QnaServiceImpl implements QnaService {

	@Autowired
	private QnaMapper qnaMapper;

	@Override
	public List<QnaDTO> getAllQna(SortDTO sortDTO) {
		return qnaMapper.getAllQna(sortDTO);
	}

	@Override
	public void insertQna(Qna qna) {
		log.info("" + qna);
		qnaMapper.insertQna(qna);
	}

	@Override
	public void updateQna(Qna qna) {
		qnaMapper.updateQna(qna);
	}

	@Override
	public List<PublicDataEventDTO> getFestivalList() {
		log.info("서비스 실행");
		return qnaMapper.getFestivalList();
	}

	@Override
	public void insertReplyQna(Qna qna) {
		log.info("DB 저장 전 답변 정보: {}", qna);
		try {
			qnaMapper.insertReplyQna(qna);
			log.info("DB 저장 완료");
		} catch (Exception e) {
			log.error("DB 저장 중 오류 발생", e);
			throw e;
		}
	}

	@Override
	public String getReply(Qna qna) {
		
		return qnaMapper.getReply(qna);
	}

	@Override
	public int getPageCount(SortDTO sortDTO) {
		return qnaMapper.getPageCount(sortDTO);
	}

	@Override
	public boolean getisAuthenticated(Qna qna) {
		int no = qnaMapper.getisAuthenticated(qna);
		if(no>=1) {
			return true;
		}
		return false;
	}
	@Override
	public void deletePostAndReplies(int no) {
		log.info(no+"");
	    qnaMapper.deletePost(no);
	    qnaMapper.deleteReply(no);
	   
	}
}