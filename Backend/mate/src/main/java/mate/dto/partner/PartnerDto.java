package mate.dto.partner;

import java.util.List;

import lombok.Data;

@Data
public class PartnerDto {
	private int userIdx;
	private String name;
	private String nickname;
	private long percent;
	private List<String> languageList;
}
