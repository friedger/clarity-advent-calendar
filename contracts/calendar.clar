(define-trait door-trait
 ((open () (response (string-utf8 4000) (string-ascii 32)))))

(define-map calendar ((number uint)) ((door principal)))

(define-public (open-door (number uint) (door <door-trait>))
  (match (get door (map-get? calendar {number: number}))
    door-principal (if (is-eq (contract-of door) door-principal)
      (contract-call? door open)
      (err "wrong door for this day"))
    (err "wrong door")))


(define-public (update-calendar (number uint) (door <door-trait>))
  (if (> (unwrap-panic (get-block-info? time (- block-height u1))) (+ u1606694400 (* number u86400)))
    (ok (map-insert calendar {number: number} {door: (contract-of door)}))
    (err "too early")))
