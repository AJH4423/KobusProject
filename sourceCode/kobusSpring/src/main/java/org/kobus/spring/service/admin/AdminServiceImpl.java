package org.kobus.spring.service.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.kobus.spring.mapper.admin.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminMapper adminMapper;

	@Override
	public List<Map<String, Object>> getUserCountsByRank() throws SQLException {
		// TODO Auto-generated method stub
		return this.adminMapper.getUserCountsByRank();
	}

	@Override
	public List<Map<String, Object>> gerTotalInfo() throws SQLException {
		// TODO Auto-generated method stub
		return this.adminMapper.gerTotalInfo();
	}

	@Override
	public List<Map<String, Object>> getCouponCount() throws SQLException {
		// TODO Auto-generated method stub
		return this.adminMapper.getCouponCount();
	}

}
