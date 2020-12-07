(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg (string-utf8 4000) u"Today is the 2nd of December. You have received 2 AC tokens.")
(define-fungible-token cal-token)

(define-public (open)
  (begin
    (ft-mint? cal-token u2 tx-sender)
    (ok (print (var-get msg)))))

(define-public (transfer? (recipient principal) (amount uint))
  (ft-transfer? cal-token amount tx-sender recipient)
)

(define-read-only (get-balance)
  (ft-get-balance cal-token tx-sender)
)

(define-read-only (decimals) u0)
(define-read-only (name) "Advent Calendar Tokens")
(define-read-only (symbol) "AC")
