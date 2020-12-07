(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg-ok (string-utf8 4000) u"Today is the 5th of December and you received a non transferable NFT")
(define-data-var msg-nok (string-ascii 32) "Something went wrong.")

(define-non-fungible-token calendar-nft uint)
(define-data-var last-id uint u0)

(define-public (open)
    (if (is-eq contract-caller 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar)
      (begin
        (let ((id (inc-last-id)))
          (nft-mint? calendar-nft id tx-sender)
        )
        (ok (print (var-get msg-ok)))
      )
      (err (print (var-get msg-nok)))))

(define-private (inc-last-id)
  (let ((new-last-id (+ u1 (get-last-id))))
    (begin
      (var-set last-id new-last-id)
      new-last-id)))

(define-read-only (get-last-id) (var-get last-id))
(define-read-only (get-owner? (id uint)) (nft-get-owner? calendar-nft id))
