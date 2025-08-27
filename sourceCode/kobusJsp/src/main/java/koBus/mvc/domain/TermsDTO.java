package koBus.mvc.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TermsDTO {
    private int terms_id;
    private String terms_type;
    private String title;
    private String content;
}
