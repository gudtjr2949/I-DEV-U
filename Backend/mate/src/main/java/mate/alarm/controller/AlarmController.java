package mate.alarm.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.alarm.dto.AlarmChatRequest;
import mate.alarm.dto.AlarmProjectRequest;
import mate.alarm.dto.AlarmRequest;
import mate.alarm.service.AlarmService;
import mate.controller.Result;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @MessageMapping("/user")
    public void createAlarm(AlarmRequest request){
        alarmService.createAlarm(request);
    }
    // 알람 테스트
    @PostMapping("/test/user")
    public Result createAlarmv2(@RequestBody AlarmRequest request){
        return alarmService.createAlarmv2(request);
    }
    //


    /*
        프로젝트 참가 신청 요청
     */
    @MessageMapping("/request/project")
    public void createProjectAlarm(AlarmProjectRequest alarmProjectRequest){
        alarmService.createProjectAlarm(alarmProjectRequest);
    }

    @MessageMapping("request/chat")
    public void createChatAlarm(AlarmChatRequest alarmChatRequest){
        alarmService.createChatAlarm(alarmChatRequest);
    }



    // 알림 리스트 조회 (내가 받은 알람)
    @GetMapping("/alarm/from/{userIdx}")
    public Result fromAlarm(@PathVariable("userIdx") Integer userIdx){
        return alarmService.findByFrom(userIdx);
    }

    // 알림 리스트 조회 (내가 보냄 알람)
    @GetMapping("/alarm/to/{userIdx}")
    public Result toAlarm(@PathVariable("userIdx") Integer userIdx){
        return alarmService.findByTo(userIdx);
    }

    //알림 삭제
    @DeleteMapping("/alarm/{idx}")
    public Result deleteAlarm(@PathVariable("idx") Integer idx){
        return alarmService.deleteByIdx(idx);
    }

}
