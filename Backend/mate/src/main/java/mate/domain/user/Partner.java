package mate.domain.user;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Partner {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "send_idx")
    private User sendUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receive_idx")
    private User receiveUser;

}
