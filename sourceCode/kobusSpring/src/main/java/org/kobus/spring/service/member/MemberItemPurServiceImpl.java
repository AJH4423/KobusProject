package org.kobus.spring.service.member;

import java.sql.SQLException;
import java.util.List;

import org.kobus.spring.domain.member.ItemCanclePurDTO;
import org.kobus.spring.domain.member.ItemPurDTO;
import org.kobus.spring.mapper.member.MemberItemPurMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberItemPurServiceImpl implements MemberItemPurService{
	
	@Autowired
	private MemberItemPurMapper memberItemPurMapper;

	@Override
	public List<ItemPurDTO> itemPopPurList(String loginId) throws SQLException {
		// TODO Auto-generated method stub
		return this.memberItemPurMapper.itemPopPurList(loginId);
	}

	@Override
	public List<ItemPurDTO> itemFreePurList(String loginId) throws SQLException {
		// TODO Auto-generated method stub
		return this.memberItemPurMapper.itemFreePurList(loginId);
	}

	@Override
	public List<ItemCanclePurDTO> itemCanclePopPurList(String loginId) throws SQLException {
		// TODO Auto-generated method stub
		return this.memberItemPurMapper.itemCanclePopPurList(loginId);
	}

	@Override
	public List<ItemCanclePurDTO> itemCancleFreePurList(String loginId) throws SQLException {
		// TODO Auto-generated method stub
		return this.memberItemPurMapper.itemCancleFreePurList(loginId);
	}

	@Override
	public int popDelete(String loginId, String popId) throws SQLException {
		// TODO Auto-generated method stub
		return this.memberItemPurMapper.popDelete(loginId, popId);
	}

	@Override
	public int freeDelete(String loginId, String popId) throws SQLException {
		// TODO Auto-generated method stub
		return this.memberItemPurMapper.freeDelete(loginId, popId);
	}

}
