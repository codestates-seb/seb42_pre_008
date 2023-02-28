package com.stackoverflow.team08.validation;

import com.stackoverflow.team08.exception.ValidationException;
import com.stackoverflow.team08.exception.ValidationExceptionCode;
import com.stackoverflow.team08.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class PatchDtoValidation {

    private final String DISPLAY_NAME_REGEXP = "[a-zA-Z1-9가-힣]{2,}";

    private final String LOCATION_REGEXP = "[a-zA-Z가-힣]{2,}";

    private final String URL_REGEXP = "(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?";

    public void checkPatchMember(Member member){

        // displayName validation
        if(!member.getDisplayName().equals("") && !member.getDisplayName().matches(DISPLAY_NAME_REGEXP)){
            throw new ValidationException(ValidationExceptionCode.DISPLAY_NAME_FAILED);
        }

        // location validation
        if(!member.getLocation().equals("") && !member.getLocation().matches(LOCATION_REGEXP)){
            throw new ValidationException(ValidationExceptionCode.LOCATION_FAILED);
        }

        // url validation
        if(!member.getMemberImage().equals("") && !member.getMemberImage().matches(URL_REGEXP)){
            throw new ValidationException(ValidationExceptionCode.MEMBER_IMAGE_URL_FAILED);
        }
    }
}
