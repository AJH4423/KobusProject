package koBus.mvc.domain;

public class TimDteDTO {
    private String fpCpnNo;  // 프리패스 번호
    private String timDte;   // 탑승 가능일

    public String getFpCpnNo() {
        return fpCpnNo;
    }
    public void setFpCpnNo(String fpCpnNo) {
        this.fpCpnNo = fpCpnNo;
    }
    public String getTimDte() {
        return timDte;
    }
    public void setTimDte(String timDte) {
        this.timDte = timDte;
    }
}
