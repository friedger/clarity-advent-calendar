(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg-ok (string-utf8 4000) u"Today is the 8th of December.")
(define-data-var msg-nok (string-ascii 32) "Something went wrong.")

(define-private (append-to-end (postfix (string-utf8 4000)) (result (string-utf8 4000)))
  (print (unwrap-panic (as-max-len? (concat result postfix) u4000))))

(define-public (open)
   (if (is-eq contract-caller 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar)
      (ok (fold append-to-end
        (list
          u" Taking the code from 6th December,"
          u" this will be a longer text."
        ) (var-get msg-ok)))
      (err (print (var-get msg-nok)))))
