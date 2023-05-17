package swipkkun.domain.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.el.parser.Token;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swipkkun.domain.member.dto.*;
import swipkkun.domain.member.service.MemberService;
import swipkkun.global.util.HeaderUtil;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<TokenDTO> signup(HttpServletResponse response, @RequestBody SignupRequestDto requestDto) {
        memberService.signup(requestDto);

        LoginRequestDto loginRequest = new LoginRequestDto();
        loginRequest.setEmail(requestDto.getEmail());
        loginRequest.setPassword(requestDto.getPassword());

        TokenDTO tokenResponse = memberService.login(loginRequest);
        HeaderUtil.setRefreshToken(response, tokenResponse.getRefreshToken());

        return ResponseEntity.ok().body(tokenResponse);
    }

    @PostMapping("/check-email")
    public ResponseEntity<String> checkEmail(@RequestBody EmailDuplicateRequestDto requestDto) {
        String checkRes = memberService.checkEmailDuplicate(requestDto);
        return ResponseEntity.ok().body(checkRes);
    }

    @PostMapping("/check-nickname")
    public ResponseEntity<String> checkNickname(@RequestBody NicknameDuplicateRequestDto requestDto) {
        String checkRes = memberService.checkNicknameDuplicate(requestDto);
        return ResponseEntity.ok().body(checkRes);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(HttpServletResponse response, @RequestBody LoginRequestDto requestDto) {
        TokenDTO tokenResponse = memberService.login(requestDto);
        // refresh token은 쿠키에 담아 보낸다
        HeaderUtil.setRefreshToken(response, tokenResponse.getRefreshToken());
        return ResponseEntity.ok().body(tokenResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenDTO> refresh(HttpServletRequest request) {
        String accessToken = HeaderUtil.getAccessToken(request);
        String refreshToken = HeaderUtil.getRefreshToken(request);

        TokenDTO tokenRequest = new TokenDTO();
        tokenRequest.setAccessToken(accessToken);
        tokenRequest.setRefreshToken(refreshToken);

        TokenDTO newTokenResponse = memberService.refresh(tokenRequest);

        return ResponseEntity.ok().body(newTokenResponse);
    }
}
