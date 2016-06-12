SELECT resultat_item_id, resultat_id from resultat_item
WHERE resultat_id NOT IN ( select resultat_id FROM resultat)

delete from resultat_item
WHERE resultat_id NOT IN ( select resultat_id FROM resultat)
